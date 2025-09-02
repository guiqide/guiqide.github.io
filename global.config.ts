import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const SiteConfig: Configuration = {
  title: "Gabriel B",
  subTitle: "My personal website",
  brandTitle: "Gabriel B",

  description: "My personal website, have work experience and technology stack.",

  site: "https://guiqide.github.io",

  locale: "zh-CN", // set for website language and date format

  navigators: [
    {
      nameKey: I18nKeys.nav_bar_home,
      href: "/",
    },
    {
      nameKey: I18nKeys.nav_bar_archive,
      href: "/archive",
    },
    {
      nameKey: I18nKeys.nav_bar_about,
      href: "/about",
    },
    {
      nameKey: I18nKeys.nav_bar_github,
      href: "https://github.com/guiqide",
    },
  ],

  username: "Gabriel B",
  sign: "Need lose weight.",
  avatarUrl: "https://images-service-1251417320.cos.ap-guangzhou.myqcloud.com/images/BarbSorcDesktop-640.bmp",
  socialLinks: [
    {
      icon: "line-md:github-loop",
      link: "https://github.com/guiqide",
    },
    {
      icon: "mingcute:bilibili-line",
      link: "https://space.bilibili.com/266747396",
    },
    {
      icon: "mingcute:netease-music-line",
      link: "https://y.qq.com/n/ryqq/playlist/2045146995",
    },
  ],
  maxSidebarCategoryChip: 6, // It is recommended to set it to a common multiple of 2 and 3
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,

  banners: [
    'https://images-service-1251417320.cos.ap-guangzhou.myqcloud.com/images/202509021605831.png'
  ],

  slugMode: "HASH", // 'RAW' | 'HASH'

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'
};

export default SiteConfig;
