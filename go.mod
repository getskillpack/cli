module github.com/getskillpack/cli

go 1.22

require github.com/getskillpack/skillget-manager v0.0.0-20260328004417-7c511f3965cf

// Local monorepo (Paperclip workspace): drop this replace after publishing skillget-manager and run: go get github.com/getskillpack/skillget-manager@<new-commit>
replace github.com/getskillpack/skillget-manager => ../skillget-manager
