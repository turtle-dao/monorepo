{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    { nixpkgs, ... }:
    let
      eachSystem =
        f:
        nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = eachSystem (pkgs: {
        default = with pkgs; mkShell {
          packages = [
            nodejs

            corepack
            bun
            pnpm

            nodePackages.typescript
            nodePackages.typescript-language-server
            brave
          ];

          shellHook = ''
            export BRAVE_BROWSER=${pkgs.brave}
          '';
        };
      });
    };
}