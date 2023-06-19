## State 최적화

### State를 최적화한다는 개념

- state는 **렌더링을 트리거**하는 주요한 역할
  → 이 말은 곧, UI를 업데이트하는 작업과 연관

<p align="center"><strong>UI 업데이트하는 데 비용이 많이 드는 DOM 작업 수를 최소화하는 것이 필요</strong></p>

<br>

### State 최적화가 중요한 이유

<p align="center"><strong>⭐ 성능 향상과 직접적인 연관 ⭐</strong><p>

1. **불필요한 렌더링 방지**
   - 화면에 변화가 없는데도 불필요하게 컴포넌트를 다시 그리는 작업을 의미
   - 불필요한 렌더링은 불필요한 리소스 사용을 초래할 수 있다
   - 동일한 데이터를 중복해서 서버에게 요청하는 경우 네트워크 대역폭 낭비 및 서버의 부하까지도 이어질 수 있다
2. **가상 DOM 비교 최소화**
   - 가상 DOM 비교는 성능에 영향을 주는 계산적인 비용이 따르는 작업
   - 따라서 state 업데이트를 최적화하여 가상 DOM 비교를 최소화하면 React의 업데이트 성능 향상

<br>

### 방법1. Independent Child, Careless Parent

### 방법2. Minimal states, Minimal render

### 방법3. Lifting the state
