import React, {useState} from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {Box} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const navigationMap = [
    {path: '/', name: 'Dashboard'},
    {path: 'folders', name: 'Folders'},
];

export const DashboardBreadcrumbs = ({routes = navigationMap, onRouteClick}) => {

    const [route, setRoute] = useState(routes);
    let {path, url} = useRouteMatch();

    const handleRouteClick = () => {
        setRoute([...route, {path: url, name: url}]);
    };

    return (
        <Box margin={'1em'}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {routes.map((r, idx) => {
                    return <Link key={idx} to={url} onClick={handleRouteClick} color={"inherit"}>{r.name}</Link>;
                })}
            </Breadcrumbs>
        </Box>
    );
};