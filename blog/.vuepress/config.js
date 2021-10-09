module.exports = {
    lang: 'zh-CN',
    title: 'wenjinghuan.cn',
    description: 'Personal site for Jinghuan Wen.',
  
    themeConfig: {
      home: '/',
      navbar: [
        {
          text: '主页',
          link: '/',
        },
        {
          text: '文章列表',
          link: '/contents',
        }
      ],
      logo: '/images/logo.png',
      logoDark: '/images/logo.png',
      DarkMode: true,
      repo: 'wenjinghuan999/wenjinghuan-cn',
      sidebar: 'auto',
      editLink: false,
      tip: '提示',
      warning: '注意',
      danger: '警告',
      details: '详情',
      notFound: ['访问的页面未找到，请检查URL是否正确'],
      backToHome: '回到主页'
    },
  }