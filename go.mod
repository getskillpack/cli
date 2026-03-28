module github.com/getskillpack/cli

go 1.22

require github.com/getskillpack/skillget-manager v0.0.0-20260328004417-7c511f3965cf

// Paperclip: ../skillget-manager pins main @ 1fd5264 (tag v0.1.0 on GitHub). Bump require to v0.1.0 and refresh go.sum via go get when the module is visible to GOPROXY (private org → board/GOPRIVATE setup); see skillget-manager RELEASE.md.
replace github.com/getskillpack/skillget-manager => ../skillget-manager
