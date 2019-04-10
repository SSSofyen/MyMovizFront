import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  Col,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

class App extends Component {

  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
    this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      popoverOpen: false,
      viewOnlylike : false,
      moviesNameList:[],
      moviesCount:0
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  handleClickLikeOn(){
    this.setState({
      viewOnlylike: true
    })
  }
  handleClickLikeOff(){
    this.setState({
      viewOnlylike: false
    })
  }

  handleClick(name, isLike){
    var moviesNameListCopy = [...this.state.moviesNameList]
    if (isLike) {
      moviesNameListCopy.push(name);
      this.setState({
        moviesNameList:moviesNameListCopy,
                moviesCount:this.state.moviesCount+1
      })
    }else{
      var index = moviesNameListCopy.indexOf(name)
      moviesNameListCopy.splice(index,1)
      this.setState({
        moviesNameList:moviesNameListCopy,
        moviesCount:this.state.moviesCount-1
      })
    }

  }

  render() {

    var movieData = [
      {
        name: "L'Odyssée de Pi",
        desc: "Après que leur bateau est victime d'une violente tempête et coule au fond du Pacifique, un adolescent et un tigre du Bengale...",
        img:"/pi.jpg"
      },
      {
        name: "Maléfique",
        desc: "Poussée par la vengeance et une volonté farouche de protéger les terres qu'elle préside, Maléfique place...",
        img:"/malefique.jpg"
      },
      {
        name: "Les Aventures de Tintin",
        desc: "Parce qu'il achète la maquette d'un bateau appelé la licorne, Tintin, un jeune reporter, se retrouve entraîné dans une fantastique aventure...",
        img:"/tintin.jpg"
      }
    ]

    var lastName= "";
    var moviesNameListCopy = [...this.state.moviesNameList];

    if (moviesNameListCopy.length > 0) {
      lastName = moviesNameListCopy.pop();
    }
    if (moviesNameListCopy.length > 0) {
      lastName =  lastName + ', ' + moviesNameListCopy.pop();
    }
    if (moviesNameListCopy.length > 0) {
      lastName =  lastName + ', ' + moviesNameListCopy.pop();
    }
    if (moviesNameListCopy.length > 0) {
      lastName = lastName + ' ...'
    }

    var ctx = this;
    var movieList = movieData.map(
      function(movie){
        return( <Movie handleClickParent={ctx.handleClick} displayOnlyLike={ctx.state.viewOnlylike} movieName= {movie.name} movieDesc= {movie.desc} movieImage= {movie.img}/> )
      }
    )

    return (<Container style={{
        margin: 0,
        minHeight: "100vh",
        minWidth: "100vw",
        paddingRight: '300px',
        paddingLeft: '300px'
      }}>
      <Row>

        <Col>
          <Nav style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start"
            }}>
            <NavItem>
              <NavLink href="#"><img src="logo.png"/></NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.handleClickLikeOff} href="#" style={{
                  color: '#FFFFFF'
                }}>
                Last releases</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.handleClickLikeOn} href="#" style={{
                  color: '#FFFFFF'
                }}>My movies</NavLink>
            </NavItem>

            <Button id="Popover1" onClick={this.toggle}>
            {this.state.moviesCount} Movie
            </Button>
            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
              <PopoverBody>{lastName}</PopoverBody>
            </Popover>

          </Nav>
        </Col>

        <Row>
          {movieList}
        </Row>

      </Row>
    </Container>);
  }
}

class Movie extends Component {
  constructor(){
    super()
    this.handleclick = this.handleclick.bind(this);
    this.state={
      like:false
    }
  }

  handleclick(){
    var isLike = !this.state.like
    this.setState({
      like:isLike
    })
    this.props.handleClickParent(this.props.movieName, isLike)
  }

  render() {

    var colorHeart;
    if (this.state.like) {
      colorHeart = '#FF5B53';
    }

    var isDisplay;
    if (this.props.displayOnlyLike && this.state.like == false) {
      isDisplay ={
        display:"none"
      }
    }

    return (<Col style={isDisplay} xs="3">
      <Card style={{marginBottom:15}}>
        <FontAwesomeIcon onClick={this.handleclick} style={{position:"absolute", top:"5%", left:"90%", color:colorHeart}} icon={faHeart}/>
        <CardImg top="top" width="100%" src={this.props.movieImage} alt="Card image cap"/>
        <CardBody>
          <CardTitle>{this.props.movieName}</CardTitle>
          <CardText>{this.props.movieDesc}</CardText>
        </CardBody>
      </Card>
    </Col>);
  }
}


export default App;
