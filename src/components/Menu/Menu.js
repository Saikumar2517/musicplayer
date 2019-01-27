import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as HelpButton } from '../../icons/help-button.svg';
import { ReactComponent as BackButton } from '../../icons/left-arrow.svg';
import { ReactComponent as CloseButton } from '../../icons/close.svg';
import { add, remove } from '../../helpers/classlist';
import IconButton from '../IconButton/IconButton';
import './styles.scss';

class Menu extends PureComponent {
  constructor() {
    super();

    this.title = React.createRef();
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      setTimeout(() => {
        [...document.querySelector('.menu').querySelectorAll('.hidden')].map((elmt) => elmt.classList.add('active'));
      }, 1200);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeView !== this.props.activeView) {
      remove(this.title.current, 'active');

      requestAnimationFrame(() => {
        setTimeout(() => {
          add(this.title.current, 'active');
        }, 100);
      });
    }
  }

  render() {
    return (
      <nav className={`menu menu--${this.props.activeView}`}>
        <IconButton label="navigate back" tabEnabled={true} className="hidden icon-button icon-button--back" onClick={this.props.onBackClick} icon={<BackButton className="icon icon--back" width={16} />} />
        <h1 ref={this.title} className="hidden menu__title">{this.props.activeView === 'list' ? 'Queue' : 'Now playing'}</h1>
        <IconButton label="about the app" tabEnabled={true} className="hidden icon-button icon-button--help" onClick={this.props.onAboutClick} icon={<HelpButton className="icon icon--help" width={27} />} />
        <IconButton label="close about" tabEnabled={true} className="icon-button icon-button--close" onClick={this.props.onCloseClick} icon={<CloseButton className="icon icon--close" width={12} />} />
      </nav>
    );
  }
}

Menu.propTypes = {
  activeView: PropTypes.string,
  onBackClick: PropTypes.func.isRequired,
  onAboutClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
}

export default Menu;
