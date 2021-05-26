import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import { SiteNav } from './SiteNav';
import { Home } from '../screens/Home';
import { About } from '../screens/About';
import { UploadScreen } from '../screens/UploadScreen';
import { ResourceListScreen } from '../screens/ResourceListScreen';
import { Resource } from '../screens/Resource';
import { RemixScreen } from '../screens/RemixScreen';

export const AppRouter = (props) => {

    return (
        <Router>
            <>
                <SiteNav />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={() => <Home />} />
                        <Route exact path="/upload" component={() => <UploadScreen />} />
                        <Route exact path="/resource/:id" render={(props) => <Resource {...props}/>} />
                        <Route exact path="/remix/:id" render={(props) => <RemixScreen {...props}/>} />
                        <Route exact path="/explore" component={() => <ResourceListScreen />} />
                        <Route exact path="/about" component={() => <About />} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </>
        </Router>
    )
}
