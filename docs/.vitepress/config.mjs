import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    head: [['link', {rel: 'icon', href: '/logo.png'}]],
    title: "松泽文档库",
    description: "A VitePress Site",
    themeConfig: {
        outlineTitle: '文章目录',
        outline: [2, 6],
        aside: 'left',
        logo: '/logo.png',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/'},
            {text: '前端', link: '/paper/front-end'},
            {text: '后端', link: '/paper/rear-end'},
            {text: '踩坑', link: '/paper/error'},
            {text: '杂项', link: '/paper/sundry'},
            {text: '工具',items:[
                {text: 'Vue', link: '/paper/tool/vue'},
                {text: 'React', link: '/paper/tool/react'},
                {text: 'Node', link: '/paper/tool/node'},
                {text: 'Python', link: '/paper/tool/python'}
                ]},
            {
                text: '关于',
                items: [
                    {text: '我的信息', link: '/paper/me'},
                    {text: '关于本站', link: '/paper/about'},
                ]
            },
            {text: '收藏网站', link: '/paper/web'}
        ],

        transition: {

        },

        sidebar: false,

        socialLinks: [
            {
                icon: {
                    svg:
                        `<svg t="1726733752381" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="4357" width="200" height="200">
                <path
                    d="M272 134.4c16-6.4 35.2-6.4 51.2 0 12.8 6.4 22.4 12.8 32 22.4l121.6 105.6h86.4l121.6-105.6c9.6-9.6 19.2-16 32-22.4 16-6.4 35.2-3.2 51.2 6.4s25.6 25.6 28.8 44.8c0 16-3.2 28.8-12.8 41.6l-25.6 25.6c-6.4 6.4-9.6 9.6-16 12.8h76.8c35.2 0 67.2 16 89.6 38.4 25.6 22.4 38.4 54.4 41.6 89.6v348.8c0 16 0 35.2-3.2 51.2-6.4 35.2-28.8 67.2-60.8 83.2-22.4 12.8-44.8 19.2-70.4 19.2H256c-19.2 0-35.2 0-54.4-3.2-35.2-9.6-64-28.8-83.2-60.8-12.8-19.2-22.4-44.8-22.4-70.4V419.2v-51.2c12.8-57.6 60.8-102.4 121.6-108.8h80c-12.8-6.4-22.4-19.2-35.2-28.8-12.8-12.8-22.4-32-19.2-48 0-19.2 12.8-38.4 28.8-48m-12.8 233.6c-22.4 3.2-41.6 22.4-48 44.8v307.2c0 28.8 16 51.2 41.6 60.8 9.6 3.2 16 3.2 25.6 3.2h492.8c25.6 0 48-12.8 57.6-35.2 6.4-12.8 6.4-25.6 6.4-38.4v-265.6-28.8c-6.4-19.2-19.2-35.2-38.4-41.6-12.8-3.2-25.6-6.4-38.4-6.4H259.2z"
                    fill="#20B0E3" p-id="4358"></path>
                <path
                    d="M358.4 464c16 0 28.8 3.2 41.6 12.8 12.8 12.8 22.4 28.8 22.4 44.8v60.8c0 12.8-3.2 28.8-12.8 38.4-12.8 16-32 22.4-51.2 22.4s-38.4-12.8-48-28.8c-6.4-12.8-9.6-25.6-6.4-41.6V512c3.2-25.6 25.6-48 51.2-51.2l3.2 3.2z m313.6 0c16 0 32 3.2 44.8 16 12.8 9.6 19.2 25.6 19.2 41.6v60.8c0 12.8-3.2 28.8-9.6 38.4-12.8 16-28.8 25.6-51.2 25.6-19.2 0-38.4-9.6-51.2-25.6-6.4-12.8-9.6-28.8-9.6-41.6v-60.8c6.4-28.8 25.6-51.2 57.6-54.4z"
                    fill="#20B0E3" p-id="4359"></path>
            </svg>`
                }, link: 'https://space.bilibili.com/1808473471'
            },
            {icon: 'github', link: 'https://github.com/matsu-na'},
            {
                icon: {
                    svg: `<svg t="1726734207551" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5315" width="200" height="200"><path d="M512 992C246.895625 992 32 777.104375 32 512S246.895625 32 512 32s480 214.895625 480 480-214.895625 480-480 480z m242.9521875-533.3278125h-272.56875a23.7121875 23.7121875 0 0 0-23.71125 23.7121875l-0.024375 59.255625c0 13.08 10.6078125 23.7121875 23.6878125 23.7121875h165.96c13.104375 0 23.7121875 10.6078125 23.7121875 23.6878125v11.855625a71.1121875 71.1121875 0 0 1-71.1121875 71.1121875h-225.215625a23.7121875 23.7121875 0 0 1-23.6878125-23.7121875V423.1278125a71.1121875 71.1121875 0 0 1 71.0878125-71.1121875h331.824375a23.7121875 23.7121875 0 0 0 23.6878125-23.71125l0.0721875-59.2565625a23.7121875 23.7121875 0 0 0-23.68875-23.7121875H423.08a177.76875 177.76875 0 0 0-177.76875 177.7921875V754.953125c0 13.1034375 10.60875 23.7121875 23.713125 23.7121875h349.63125a159.984375 159.984375 0 0 0 159.984375-159.984375V482.36a23.7121875 23.7121875 0 0 0-23.7121875-23.6878125z" fill="#C71D23" p-id="5316"></path></svg>`
                }, link: 'https://gitee.com/sxizdn'
            },

        ],

        footer: {
            copyright: 'Copyright © 2022-present Matsu'
        }
        ,
        search: {
            provider: 'local',
            options:
                {
                    translations: {
                        button: {
                            buttonText: "搜索文档",
                            buttonAriaLabel:
                                "搜索文档",
                        }
                        ,
                        modal: {
                            noResultsText: "无法找到相关结果",
                            resetButtonTitle:
                                "清除查询条件",
                            footer:
                                {
                                    selectText: "选择",
                                    navigateText:
                                        "切换",
                                }
                            ,
                        }
                        ,
                    }
                    ,
                }
        }
        ,
    },

})
