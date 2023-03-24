import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { PostsList } from './components/posts/PostList'
import { AddPostForm } from './components/posts/AddFormPost'
import { SinglePostPage } from './components/posts/SinglePostPage'
import { EditPostForm } from './components/posts/EditPostForm'
import { UsersList } from './components/users/UsersList'
import { UserPage } from './components/users/UserPage'
import { NotificationsList } from './components/notifications/NotificationsList'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/notifications" component={NotificationsList} />
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm />
                <PostsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
