import React, { Component } from 'react';
import BGimage1 from '../../image/HD wallpaper_ pc  hd 1080p nature  1920x1080.jfif';
import BGimage2 from '../../image/background1.jpg';
import BGimage3 from '../../image/cool-nature-backgrounds-2.jpg'


class Headers extends Component {


    constructor(props) {
        super(props);
        this.state = {
            image1: true,
            image2: false,
            image3: false,
            count: 0
        };
    }

    
    componentDidMount() {
        this.countInterval = setInterval(() => this.increment(), 5000)
    }

    increment() {
        if(this.state.image1===true){
            this.setState({image1:false})
            this.setState({image2:true})
        }else{
            if(this.state.image2===true){
                this.setState({image2:false})
                this.setState({image3:true})
            }else{
                if(this.state.image3===true){
                    this.setState({image1:true})
                    this.setState({image3:false})
                }
            }
        }
    }
    

    render() {
        const {image1, image2, image3} = this.state;
        return (
            <div>
                <img src={BGimage1}
                    style={image1 ? imgEnable : imgDisable}
                    alt="Logotel"
                    importances="hight"/>
                <img src={BGimage2}
                    style={image2 ? imgEnable : imgDisable}
                    alt="Logotel"
                    importances="hight"/>
                <img src={BGimage3}
                    style={image3 ? imgEnable : imgDisable}
                    alt="Logotel"
                    importances="hight"/>
            </div>
        )
    }

}

const imgDisable = {
    width: '100%',
    height: '300px',
    position: 'absolute',
    top: '0px',
    opacity : '0',
    transition : "opacity 1.4s ease-in ",
    
}

const imgEnable = {
    width: '100%',
    height: '300px',
    position: 'absolute',
    top: '0px',
    opacity : '0.99',
    transition : "opacity 1.4s ease-in",
   
}


export default Headers


