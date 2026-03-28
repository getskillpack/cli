package main

import (
	"context"
	"os"
	"testing"
	"time"

	skillgetmanager "github.com/getskillpack/skillget-manager"
)

// Exercises the default production registry base URL (see skillget-manager config).
// Opt out in offline sandboxes: SKIP_SKILLGET_REGISTRY_INTEGRATION=1 (same as npm test/integration-registry-install.mjs).
// CI uses go test -short: this test is skipped in short mode so pushes stay green when the registry is down or flaky.
// Full check: go test -mod=vendor -count=1 ./cmd/skillget/ -run TestPublicRegistrySearchSkillsIntegration
func TestPublicRegistrySearchSkillsIntegration(t *testing.T) {
	if testing.Short() {
		t.Skip("-short")
	}
	if os.Getenv("SKIP_SKILLGET_REGISTRY_INTEGRATION") == "1" {
		t.Skip("SKIP_SKILLGET_REGISTRY_INTEGRATION=1")
	}
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
