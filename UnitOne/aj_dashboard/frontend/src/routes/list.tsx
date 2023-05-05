import React from "react";

const routes: Array<RouteType> = [
    {
        path: '/projects',
        component: React.lazy(() => import('../pages/projects')),
        state: {
            breadcrumbs: [
                {
                    label: 'Projects',
                    name:'all-projects'
                }
            ]
        },
        children: [
            {
                path: "/",
                component: React.lazy(() => import('../pages/projects')),
                name: 'all-projects',
                label: 'Projects',
                state: {
                    breadcrumbs: [
                        {
                            label: 'Projects',
                            name:'all-projects'
                        }
                    ]
                },

            }
        ]
    }
]


const _findSingleRoute = (routeList: RouteType[], name: string): any => {
    return routeList?.find<RouteType>((route: RouteType): route is RouteType => {
        if (route?.children && route?.children?.length > 0)
            return _findSingleRoute(route?.children, name)
        return route?.name?.toLowerCase() == name?.toLowerCase()
    });
}
export const getRoute = (name: string): any => {
    return _findSingleRoute(routes, name);
}

export default routes;