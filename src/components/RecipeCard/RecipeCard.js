import { Component } from 'react';
import PropTypes from 'prop-types';
import { TfiAlarmClock, TfiPieChart, TfiBarChart } from 'react-icons/tfi';
import { HiTrash, HiZoomIn } from 'react-icons/hi';
import {
  Container,
  BadgeList,
  InfoBlock,
  Name,
  Meta,
  RecipeInfo,
  Badge,
  Actions,
} from './RecipeCard.styled';
import { RecipeDifficulty } from 'constans';
import { ImageModal } from 'components/ImageModal/ImageModal';

export class RecipeCard extends Component {
  state = {
    selectedImg: null,
  };
  setSelectedImg = () => {
    this.setState({ selectedImg: this.props.item.image });
  };
  closeModal = () => {
    this.setState({ selectedImg: null });
  };
  render() {
    const { selectedImg } = this.state;
    const {
      item: { id, image, name, time, servings, calories, difficulty },
      onDelete,
    } = this.props;
    return (
      <Container>
        <img src={image} alt={name} width="320" />
        <Meta>
          <Name>{name}</Name>
          <RecipeInfo>
            <InfoBlock>
              <TfiAlarmClock size="24" />
              <span>{time} min</span>
            </InfoBlock>
            <InfoBlock>
              <TfiPieChart size="24" />
              <span>{servings} servings</span>
            </InfoBlock>
            <InfoBlock>
              <TfiBarChart size="24" />
              <span>{calories} calories</span>
            </InfoBlock>
          </RecipeInfo>
          <h3>Difficulty</h3>
          <BadgeList>
            <Badge
              active={difficulty === RecipeDifficulty.easy}
              type={RecipeDifficulty.easy}
            >
              Easy
            </Badge>
            <Badge
              active={difficulty === RecipeDifficulty.medium}
              type={RecipeDifficulty.medium}
            >
              Medium
            </Badge>
            <Badge
              active={difficulty === RecipeDifficulty.hard}
              type={RecipeDifficulty.hard}
            >
              Hard
            </Badge>
          </BadgeList>
          <Actions>
            <button aria-label="Delete" onClick={() => onDelete(id)}>
              <HiTrash />
            </button>
            <button aria-label="Zoom" onClick={this.setSelectedImg}>
              <HiZoomIn />
            </button>
          </Actions>
        </Meta>
        <ImageModal
          isOpen={selectedImg !== null}
          onClose={this.closeModal}
          img={selectedImg}
        />
      </Container>
    );
  }
}

RecipeCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    servings: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    difficulty: PropTypes.oneOf(['easy', 'medium', 'hard']).isRequired,
  }).isRequired,
};
