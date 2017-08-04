import React from 'react'
import {Route} from 'react-router'
import App from '../App'
import TodosContainer from '../containers/TodoContainer'

export default (
<div>
  <Route path = '/' component={App}/>
    <Route path ='/todos' component={TodosContainer}/>
    <Route/>
</div>
)

//Need to add route for Header /Todos
