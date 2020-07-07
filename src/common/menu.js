const menuData = [
    {
        name: 'dashboard',
        icon: 'dashboard',
        path: 'dashboard', //必须唯一
        children: [
            {
                name: '模态框-例子1',
                path: '/dashboard/example1',
            },
            {
                name: '模态框-例子2',
                path: '/dashboard/example2',
            }
        ],
    },
    {
        name: '用户设置',
        icon: 'shop',
        path: '/setting', //必须唯一

    },
    {
        name: '账户',
        icon: 'user',
        path: 'user',
        showMenu: false,    //是否显示menu
        children: [
            {
                name: '登录',
                path: '/user/login',
            }
        ],
    },
];

export default menuData;
