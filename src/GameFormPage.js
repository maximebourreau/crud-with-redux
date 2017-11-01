import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveGame, fetchGame, updateGame } from './actions';
import GameForm from './GameForm';

class GameFormPage extends React.Component {

  state = {
    redirect: false,
    err: null
  }

  componentDidMount = () => {
    if (this.props.match.params._id) {
      this.props.fetchGame(this.props.match.params._id)
        .catch(err => this.setState({ err }));
    }
  }

  saveGame = ({_id, title, cover }) => {
    if (_id) {
      return this.props.updateGame({ _id, title, cover }).then(
        () => { this.setState({ redirect: true })},
      );
    } else {
      return this.props.saveGame({ title, cover }).then(
        () => { this.setState({ redirect: true })},
      );
    }
  }

  render() {
    return (
      <div>
        {
          this.state.err ?
          <h1>{this.state.err.message}</h1> :
          this.state.redirect ?
          <Redirect to="/games" /> :
          <GameForm
            editMode={!!this.props.match.params._id}
            game={this.props.game}
            saveGame={this.saveGame}
          />
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  if (props.match.params._id) {
    return {
      game: state.games.find(item => item._id === props.match.params._id)
    }
  }

  return { game: null };
}

export default connect(mapStateToProps, { saveGame, fetchGame, updateGame })(GameFormPage);
