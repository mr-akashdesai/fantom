/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable quotes */
const packageJson = require("./package.json");
const { version } = packageJson;

const commonLinuxConfig = {
  icon: {
    scalable: "./src/assets/images/logo/fantom-logo-lg.svg",
  },
};

const config = {
  packagerConfig: {
    icon: "./src/assets/images/logo/fantom-logo.icns",
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      platforms: ["win32"],
      config: (arch) => ({
        name: "fantom",
        iconUrl: "./src/assets/images/logo/fantom-logo.ico",
        setupExe: `fantom-${version}-win32-${arch}-setup.exe`,
        noMsi: true,
      }),
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      platforms: ["linux"],
      config: commonLinuxConfig,
    },
    {
      name: "@electron-forge/maker-rpm",
      platforms: ["linux"],
      config: commonLinuxConfig,
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "mr-akashdesai",
          name: "fantom",
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        mainConfig: "./webpack.main.config.js",
        devContentSecurityPolicy:
          "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;",
        renderer: {
          config: "./webpack.renderer.config.js",
          entryPoints: [
            {
              html: "./src/index.html",
              js: "./src/electron/renderer.tsx",
              name: "main_window",
              preload: {
                js: "./src/electron/preload.ts",
              },
            },
          ],
        },
      },
    },
  ],
};

module.exports = config;
