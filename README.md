# 最佳实践
1. 无状态组件非常简单，开销很低，如果可能的话尽量使用无状态组件.都要使用propTypes
  - 优点
    - 语法更简洁
    - 占内存更小（class 有 props context _context 等诸多属性），首次 render 的性能更好
    - 可以写成无副作用的纯函数
    - 可拓展性更强（函数的 compose，currying 等组合方式，比 class 的 extend/inherit 更灵活）
  - 缺点
    - 无生命周期函数.但是可以使用 `高阶组件` 去实现生命周期
    - 没有 `this`.在 stateless functions 中，this 是 undefined，所以是不能使用 this 变量。不过换个角度思考，this 是在运行时随时可以被修改或重新赋值，跟外界环境有着密切的联系，正是不使用this才会让组件变得更纯。

2. 容器组件(必须用es6声明, 不然无状态组件的热更新会失败)和展示组件(建议用stateless function)分离, 组件尽量拆分以更好的支持模块化, 接受的props不宜过多, 少用`...this.props`

3. ReactDefaultBatchingStrategy记录运行时错误
  - render functions
  - lifecycle methods (componentDidMount, componentWillUpdate)
  - event callbacks (onClick , onChange)

4. map里面添加key，并且key不要使用index.React的key应该是稳定的, 唯一的(只要在列表项中唯一就行). 把数组的下标作为key的缺点在于没有满足稳定性要求
[id]: https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318#.z4dr6ywso 

5. HOC
无状态组件一般会搭配高阶组件一起使用，高阶组件用来托管state，Redux 框架就是通过 store 管理数据源和所有状态，其中所有负责展示的组件都使用无状态函数式的写法。

6. axios的catch中一定要做异常返回处理

7. 先写组件原型图
```
<App>
  <Header>
    <Navigation> ... </Navigation>
  </Header>
  <CompanyHome>
    <Banner>
    </Banner>
    <Report>
      <LeftBar>
      </LeftBar>
      <TabContent>
      </TabContent>
    </Report>
  </CompanyHome>
</App>
```

8. mobx-react
  - When using both @inject and @observer, make sure to apply them in the correct order: observer should be the inner decorator, inject the outer. There might be additional decorators in between.
  - observer allows components to render independently from their parent and in general this means that the more you use observer, the better the performance become. The overhead of observer itself is neglectable

9. action和runInAction的区别
```
fetch().then(product => runInAction(() => {
    this.focusedProduct = product;
    this.nav.finishPending();
}))
```
equivalent to:
```
fetch().then(action(product => {
    this.focusedProduct = product;
    this.nav.finishPending();
}))
```
runInAction必须声明名称

10. axios cancel token 解决竞态
11. UiStore存储页面交互状态(翻页, 展开, 高亮...)