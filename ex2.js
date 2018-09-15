class ScrollPosition extends React.Component {
  constructor() {
    super();
    this.state = { position: 0 };
    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.updatePosition);
  }

  updatePosition() {
    this.setState({ position: window.pageYOffset });
  }

  render() {
    return this.props.children(this.state.position);
  }
}

const App = () => (
  <div>
    <ScrollPosition>
      {position => (
        <div>
          <h1>Hello World</h1>
          <p>You are at {position}</p>
        </div>
      )}
    </ScrollPosition>
  </div>
);
