export default layouts => [
    {
        path: 'cmms/modelsCatalog',
        component: layouts.modelsInventory,
        props: route => ({
            path: 'cmms/modelsCatalog',
            back: false
        })
    }
]
