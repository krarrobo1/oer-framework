import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import { SiteNav } from './SiteNav';
import { Home } from 'src/pages/HomePage';
import { About } from 'src/pages/AboutPage';
import { UploadScreen } from 'src/pages/UploadPage';
import { ResourceListScreen } from 'src/pages/ExplorePage';
import { Resource } from 'src/pages/ResourcePage';
import { RemixScreen } from 'src/pages/RemixPage';

export const AppRouter = () => {

    return (
        <Router>
            <SiteNav />
            <div className="container">
                <Switch>
                    <Route exact path="/" component={() => <Home />} />
                    <Route exact path="/upload" component={() => <UploadScreen />} />
                    <Route exact path="/resource/:id" render={(props) => <Resource {...props} />} />
                    <Route exact path="/remix/:id" render={(props) => <RemixScreen {...props} />} />
                    <Route exact path="/explore" component={() => <ResourceListScreen />} />
                    <Route exact path="/about" component={() => <About />} />
                </Switch>
            </div>
        </Router>
    )
}
