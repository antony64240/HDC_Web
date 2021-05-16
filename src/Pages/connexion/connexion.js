import React from "react";
import "./connexion.css";
import { ForgetPassword } from "../../components/componentsPage/login/index";
import Login from "../../components/componentsPage/login/Login";
import Register from "../../components/componentsPage/login/register";
import { withTranslation  } from "react-i18next";
import  Lang  from "../../language/Lang"

class Connexion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      ismdpForget: false,
      current : "Inscription",
    };
    this.setState(()=>{})
    this.setState([])
    this.setState({},()=>{})
    this.setState({})
  }

  componentDidMount() {
    if(!this.state.ismdpForget) this.rightSide.classList.add("right");
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState=>({isLogginActive:!prevState.isLogginActive}));
  }

  render() {
    const { t } = this.props;
    const { isLogginActive } = this.state;
    const current = isLogginActive ? t('register.translated-text') : t('connexion.translated-text');
    const currentActive = isLogginActive ? t('connexion.translated-text') : t('register.translated-text');
    if(!this.state.ismdpForget){
      return (

        <React.Fragment>
        <Lang/>
        <div className="Connexion">
          <div className="login">
            <div className="container" ref={ref => (this.container = ref)}>
              {isLogginActive && (
                <Login ismdpForget={this} mdpForget={this} containerRef={ref => (this.current = ref)} />
              )}
              {!isLogginActive && (
                <Register containerRef={ref => (this.current = ref)} />
              )}
            </div>
            <RightSide
              current={current}
              currentActive={currentActive}
              containerRef={ref => (this.rightSide = ref)}
              onClick={this.changeState.bind(this)}
            />
          </div>
        </div>
        </React.Fragment> 
      );
    }else{
      return (

        <div className="Connexion">
          <div className="login">
            <div className="container" ref={ref => (this.container = ref)}>
                <ForgetPassword mdpForget={this} containerRef={ref => (this.current = ref)} />
            </div>
          </div>
        </div>
        
      )
    }
  }
}


const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default withTranslation()(Connexion);