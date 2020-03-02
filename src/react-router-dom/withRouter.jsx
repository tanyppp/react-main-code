import React from 'react';
import Route from './route';

const WithRouter = Cmp => () => <Route component={Cmp}></Route>

export default WithRouter;
