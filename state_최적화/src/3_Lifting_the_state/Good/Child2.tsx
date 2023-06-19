import React from 'react'

const Child2 = React.memo(() => {
  console.log('Child2 컴포넌트 렌더링')

  return (
    <div>
      <h3>Child2</h3>
      <img src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTdfMjQ2/MDAxNTgxOTEwNjk1NDE4.R8fVaR-F8n5YKWWeK1HfxJMWV9q5aiPrt2dgQ8_Ci4cg.3VvN_lBBaSe4nCJYHeT7r1ufIj6ddEG-EJqx9YZvxbEg.JPEG.o8o8o8486/1581910694939.jpg?type=w800" />
      <img src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTdfMjc5/MDAxNTgxOTEwNjkzODU0.0-gDHgU8rsy-8Ihv0EhGEbT8WiSiJPX_N2YftJR3drIg.l0njPdqGoB8nUTYb4H2hbC7VlnTZUCG19v5XGKeeWSAg.JPEG.o8o8o8486/1581910693373.jpg?type=w800" />
      <img src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTdfNjkg/MDAxNTgxOTEwNjk0MzU3.uXOp3QCdRNXqBXa7mvRl-ax5S_Cz7Yr7FJBoaPARC78g.bmb4-yDHcEYm4p-v2ONWPBgfqskUMYag8JnVxBdxIJcg.JPEG.o8o8o8486/1581910693868.jpg?type=w800" />
      <img src="https://p4.wallpaperbetter.com/wallpaper/501/621/320/family-kirby-nintendo-platform-wallpaper-preview.jpg" />
    </div>
  )
})

export default Child2
