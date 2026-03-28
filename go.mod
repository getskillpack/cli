module github.com/getskillpack/cli

go 1.22

require github.com/getskillpack/skillget-manager v0.0.0-20260328004417-7c511f3965cf

// Paperclip workspace: sibling ../skillget-manager (main @ 3693d8d) overrides this require. When publishing: go get github.com/getskillpack/skillget-manager@main && drop replace.
replace github.com/getskillpack/skillget-manager => ../skillget-manager
