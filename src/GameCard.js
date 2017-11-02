import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Confirm } from 'semantic-ui-react';

class GameCard extends React.Component {
  state = {
    confirmDelete: false
  }
  render() {
    return (
      <div className="ui card">
        <div className="image">
          <img src={this.props.game.cover} alt="Game Cover" />
        </div>
        <div className="content">
          <div className="header">{this.props.game.title}</div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <Link to={`/game/${this.props.game._id}`} className="ui basic button green">Edit</Link>
            <div className="ui basic button red" onClick={() => { this.setState({ confirmDelete: true }); }}>Delete</div>
          </div>
        </div>
        <Confirm
          content = {`Delete ${this.props.game.title} ?`}
          confirmButton = {'Delete'}
          open={ this.state.confirmDelete }
          onCancel={() => { this.setState({ confirmDelete: false }); }}
          onConfirm={() => this.props.deleteGame(this.props.game._id) }
        />
      </div>
    );
  }
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  deleteGame: PropTypes.func.isRequired
}

export default GameCard;
