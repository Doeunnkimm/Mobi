// import Parent from './1_Independent_child_and_careless_parent/Bad/Parent'
// import Parent from './1_Independent_child_and_careless_parent/Good/Parent'

import ToMuchState from './2_Minimal_state_and_minimal_render/Bad/ToMuchState'
import MinimalState from './2_Minimal_state_and_minimal_render/Good/MinimalState'
import Parent from './3_Lifting_the_state/Bad/Parent'
// import Parent from './3_Lifting_the_state/Good/Parent'

function App() {
  return (
    // <Parent />
    // <Parent />
    // <ToMuchState />
    // <MinimalState />
    <Parent />
  )
}

export default App
