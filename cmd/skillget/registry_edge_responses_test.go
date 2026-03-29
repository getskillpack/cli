package main

import (
	"context"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	skillgetmanager "github.com/getskillpack/skillget-manager"
)

// Stub-registry tests for HTTP status handling (401 / 404 / 410) per REGISTRY_CLIENT_CONTRACT.
// Always run under go test -short; no live network.

func swapRegistryHTTPClient(t *testing.T, c *http.Client) func() {
	t.Helper()
	prev := skillgetmanager.HTTPClient
	skillgetmanager.HTTPClient = c
	return func() { skillgetmanager.HTTPClient = prev }
}

func TestRegistrySearchSkills_401IncludesReadTokenHint(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet || r.URL.Path != "/api/v1/skills" {
			http.NotFound(w, r)
			return
		}
		http.Error(w, `{"error":"unauthorized"}`, http.StatusUnauthorized)
	}))
	defer srv.Close()
	defer swapRegistryHTTPClient(t, srv.Client())()

	t.Setenv("SKILLGET_REGISTRY_URL", srv.URL+"/api/v1")
	t.Setenv("SKILLGET_REGISTRY_READ_TOKEN", "")
	t.Setenv("SKILLGET_REGISTRY_TOKEN", "")
	t.Setenv("SKILLGET_TOKEN", "")

	_, err := skillgetmanager.SearchSkills(context.Background(), skillgetmanager.SearchSkillsOptions{Limit: 3})
	if err == nil {
		t.Fatal("expected error")
	}
	s := err.Error()
	if !strings.Contains(s, "401") {
		t.Fatalf("expected status in error, got: %s", s)
	}
	if !strings.Contains(s, "SKILLGET_REGISTRY_READ_TOKEN") {
		t.Fatalf("expected 401 hint for reads, got: %s", s)
	}
}

func TestRegistrySearchSkills_404IncludesSkillHint(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet || r.URL.Path != "/api/v1/skills" {
			http.NotFound(w, r)
			return
		}
		http.NotFound(w, r)
	}))
	defer srv.Close()
	defer swapRegistryHTTPClient(t, srv.Client())()

	t.Setenv("SKILLGET_REGISTRY_URL", srv.URL+"/api/v1")

	_, err := skillgetmanager.SearchSkills(context.Background(), skillgetmanager.SearchSkillsOptions{Limit: 3})
	if err == nil {
		t.Fatal("expected error")
	}
	s := err.Error()
	if !strings.Contains(s, "404") {
		t.Fatalf("expected status in error, got: %s", s)
	}
	if !strings.Contains(s, "SKILLGET_REGISTRY_URL") {
		t.Fatalf("expected 404 hint, got: %s", s)
	}
}

func TestRegistryResolveInstallTarget_Skill404(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet && r.URL.Path == "/api/v1/skills/nope-such-skill" {
			http.NotFound(w, r)
			return
		}
		http.NotFound(w, r)
	}))
	defer srv.Close()
	defer swapRegistryHTTPClient(t, srv.Client())()

	t.Setenv("SKILLGET_REGISTRY_URL", srv.URL+"/api/v1")

	_, err := skillgetmanager.ResolveInstallTarget(context.Background(), "nope-such-skill")
	if err == nil {
		t.Fatal("expected error")
	}
	s := err.Error()
	if !strings.Contains(s, "404") {
		t.Fatalf("expected status in error, got: %s", s)
	}
}

func TestRegistryResolveInstallTarget_Version410YankedHint(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet && r.URL.Path == "/api/v1/skills/yanked-pkg/versions/1.0.0" {
			http.Error(w, `{"error":"gone"}`, http.StatusGone)
			return
		}
		http.NotFound(w, r)
	}))
	defer srv.Close()
	defer swapRegistryHTTPClient(t, srv.Client())()

	t.Setenv("SKILLGET_REGISTRY_URL", srv.URL+"/api/v1")

	_, err := skillgetmanager.ResolveInstallTarget(context.Background(), "yanked-pkg@1.0.0")
	if err == nil {
		t.Fatal("expected error")
	}
	s := err.Error()
	if !strings.Contains(s, "410") {
		t.Fatalf("expected status in error, got: %s", s)
	}
	if !strings.Contains(s, "yanked") {
		t.Fatalf("expected yanked hint, got: %s", s)
	}
}

func TestRegistryPublishSkill_401IncludesTokenHint(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost || r.URL.Path != "/api/v1/skills" {
			http.NotFound(w, r)
			return
		}
		http.Error(w, `{"error":"unauthorized"}`, http.StatusUnauthorized)
	}))
	defer srv.Close()
	defer swapRegistryHTTPClient(t, srv.Client())()

	t.Setenv("SKILLGET_REGISTRY_URL", srv.URL+"/api/v1")
	t.Setenv("SKILLGET_REGISTRY_TOKEN", "test-token-for-publish")

	err := skillgetmanager.PublishSkill(context.Background(), []byte(`{}`), []byte("fake"))
	if err == nil {
		t.Fatal("expected error")
	}
	s := err.Error()
	if !strings.Contains(s, "401") {
		t.Fatalf("expected status in error, got: %s", s)
	}
	if !strings.Contains(s, "SKILLGET_REGISTRY_READ_TOKEN") {
		t.Fatalf("expected 401 registry hint, got: %s", s)
	}
}
