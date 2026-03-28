package main

import (
	"context"
	"os"
	"path/filepath"
	"testing"
	"time"

	skillgetmanager "github.com/getskillpack/skillget-manager"
)

// Live tests against the default production registry (skillget-manager default base URL).
// Skipped under go test -short (default PR/push CI) or SKIP_SKILLGET_REGISTRY_INTEGRATION=1 (offline / npm parity).
// Full run: go test -mod=vendor ./cmd/skillget/ -run 'TestPublicRegistry.*Integration'

func skipLiveRegistry(t *testing.T) {
	t.Helper()
	if testing.Short() {
		t.Skip("-short")
	}
	if os.Getenv("SKIP_SKILLGET_REGISTRY_INTEGRATION") == "1" {
		t.Skip("SKIP_SKILLGET_REGISTRY_INTEGRATION=1")
	}
}

func TestPublicRegistrySearchSkillsIntegration(t *testing.T) {
	skipLiveRegistry(t)
	ctx, cancel := context.WithTimeout(context.Background(), 25*time.Second)
	defer cancel()
	res, err := skillgetmanager.SearchSkills(ctx, skillgetmanager.SearchSkillsOptions{
		Limit:  5,
		Offset: 0,
	})
	if err != nil {
		t.Fatalf("search skills (default registry): %v", err)
	}
	if res == nil {
		t.Fatal("nil response body")
	}
}

// SKILLGET_SMOKE_INSTALL_SPEC overrides the skill name (default: para-memory-files — same as npm integration test).
func TestPublicRegistryInstallSkillIntegration(t *testing.T) {
	skipLiveRegistry(t)
	spec := os.Getenv("SKILLGET_SMOKE_INSTALL_SPEC")
	if spec == "" {
		spec = "para-memory-files"
	}
	cwd := t.TempDir()
	ctx, cancel := context.WithTimeout(context.Background(), 90*time.Second)
	defer cancel()
	res, err := skillgetmanager.DownloadSkillArchive(ctx, spec, skillgetmanager.DownloadSkillOptions{Cwd: cwd})
	if err != nil {
		t.Fatalf("install %q: %v", spec, err)
	}
	if res == nil || res.ArchivePath == "" {
		t.Fatal("empty result")
	}
	if _, err := os.Stat(res.ArchivePath); err != nil {
		t.Fatalf("archive path: %v", err)
	}
	lockPath := filepath.Join(cwd, "skills.lock")
	if _, err := os.Stat(lockPath); err != nil {
		t.Fatalf("skills.lock: %v", err)
	}
}
