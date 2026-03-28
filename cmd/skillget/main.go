// Command skillget is the native CLI for the getskillpack registry (search, install, config).
package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	skillgetmanager "github.com/getskillpack/skillget-manager"
)

const version = "0.1.0"

func main() {
	if len(os.Args) < 2 {
		usage()
		os.Exit(2)
	}
	switch os.Args[1] {
	case "-h", "--help", "help":
		usage()
	case "-V", "--version":
		fmt.Println(version)
	case "search":
		if err := runSearch(os.Args[2:]); err != nil {
			fmt.Fprintf(os.Stderr, "skillget: %v\n", err)
			os.Exit(1)
		}
	case "install":
		if err := runInstall(os.Args[2:]); err != nil {
			fmt.Fprintf(os.Stderr, "skillget: %v\n", err)
			os.Exit(1)
		}
	case "config":
		runConfig()
	default:
		usage()
		os.Exit(2)
	}
}

func usage() {
	fmt.Fprintf(os.Stderr, `skillget — getskillpack registry client

Usage:
  skillget search [-limit N] [query]
  skillget install [-o path] <name|name@version>
  skillget config
  skillget -V

Environment:
  SKILLGET_REGISTRY_URL   registry API base (optional)
  SKPKG_REGISTRY_URL      legacy fallback

`)
}

func runSearch(args []string) error {
	fs := flag.NewFlagSet("search", flag.ContinueOnError)
	fs.SetOutput(os.Stderr)
	limit := fs.Int("limit", 20, "max rows")
	if err := fs.Parse(args); err != nil {
		return err
	}
	query := strings.TrimSpace(strings.Join(fs.Args(), " "))
	ctx := context.Background()
	res, err := skillgetmanager.SearchSkills(ctx, skillgetmanager.SearchSkillsOptions{
		Query:  query,
		Limit:  *limit,
		Offset: 0,
	})
	if err != nil {
		return err
	}
	if len(res.Data) == 0 {
		fmt.Println("No skills found.")
		return nil
	}
	for _, row := range res.Data {
		ver := ""
		if row.LatestVersion != "" {
			ver = "@" + row.LatestVersion
		}
		fmt.Printf("%s%s\n", row.Name, ver)
		if row.Description != "" {
			fmt.Printf("  %s\n", row.Description)
		}
	}
	if res.Meta != nil {
		fmt.Printf("\n(%d total)\n", res.Meta.Total)
	}
	return nil
}

func runInstall(args []string) error {
	fs := flag.NewFlagSet("install", flag.ContinueOnError)
	fs.SetOutput(os.Stderr)
	out := fs.String("o", "", "output file path (default: .skillget/skills/<name>/<version>/...)")
	if err := fs.Parse(args); err != nil {
		return err
	}
	if fs.NArg() != 1 {
		return fmt.Errorf("install requires exactly one argument: skill name or name@version")
	}
	spec := fs.Arg(0)
	ctx := context.Background()
	cwd, err := os.Getwd()
	if err != nil {
		return err
	}
	opts := skillgetmanager.DownloadSkillOptions{Cwd: cwd}
	if *out != "" {
		opts.OutputPath = *out
	}
	res, err := skillgetmanager.DownloadSkillArchive(ctx, spec, opts)
	if err != nil {
		return err
	}
	fmt.Printf("Wrote %s\n", res.ArchivePath)
	fmt.Printf("Updated %s\n", filepath.Join(cwd, "skills.lock"))
	if res.Meta.Checksum != "" {
		fmt.Printf("Checksum (registry): %s\n", res.Meta.Checksum)
	}
	fmt.Println("Extract the archive where you need it (tar -xzf …).")
	return nil
}

func runConfig() {
	url := skillgetmanager.RegistryBaseURL()
	src := skillgetmanager.RegistryConfigSource()
	fmt.Printf("registry URL: %s\n", url)
	fmt.Printf("source: %s\n", src)
	if src == "default" {
		fmt.Println("override: export SKILLGET_REGISTRY_URL=… (or legacy SKPKG_REGISTRY_URL)")
	}
}
