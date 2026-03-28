# Homebrew formula for skillget (getskillpack registry CLI).
# Typical tap layout: put this file in a tap repo as Formula/skillget.rb, then:
#   brew tap getskillpack/tap
#   brew install skillget
# Or install from this path:
#   brew install --build-from-source ./packaging/homebrew/skillget.rb
class Skillget < Formula
  desc "CLI for the getskillpack skill registry"
  homepage "https://github.com/getskillpack/cli"
  license "MIT"
  head "https://github.com/getskillpack/cli.git", branch: "main"

  depends_on "go" => :build

  def install
    system "go", "build", *std_go_args(ldflags: "-s -w"), "./cmd/skillget"
  end

  test do
    assert_match "registry URL", shell_output("#{bin}/skillget config 2>&1")
  end
end
