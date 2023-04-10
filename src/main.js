import './sass/style.scss';
import { Article } from './js/Article';
import { ArticleModal } from './js/ArticleModal';
import { Modal } from './js/Modal';
import { addNavLinksHandler } from './js/ScrollSmooth';
import data, { logoData } from './js/data/data';

window.onload = function () {
  // Handle Burger-menu
  addBurgerClickHandler();

  // Handle clicks to navigation
  addNavLinksHandler(BURGER_BUTTON, NAVIGATION_MENU);

  // Render Articles
  if (data) {
    renderArticlesToDom();
  }

  // Tags
  addTagsClickHandler();

  // Generate Base Modal from Modal Class
  addToolsClickHandler();

  // Handle logo
  HEADER_LOGO.data = logoData;
  FOOTER_LOGO.data = logoData;

  // Handle click to form submit button
  addSubmitPlaceholderAction();
};

const BURGER_BUTTON = document.querySelector('.hamburger');
const NAVIGATION_MENU = document.querySelector('.header__navigation');
const HEADER_LOGO = document.getElementById('headerLogo');
const FOOTER_LOGO = document.getElementById('footerLogo');
const SUBMIT_BUTTON = document.getElementById('submitButton');

const addSubmitPlaceholderAction = () => {
  SUBMIT_BUTTON.addEventListener('click', (e) => {
    e.preventDefault();
  });
};

const addBurgerClickHandler = () => {
  BURGER_BUTTON.addEventListener('click', () => {
    NAVIGATION_MENU.classList.toggle('active-burger');
    BURGER_BUTTON.classList.toggle('rotate-burger');
    document.body.classList.toggle('no-scroll');
  });
};

const addTagsClickHandler = () => {
  document.querySelector('.strategies__tags').addEventListener('click', (e) => {
    if (e.target.classList.contains('tag')) {
      let clickedTag = e.target;
      removeSelectedTags();
      selectClickedTag(clickedTag);
      if (clickedTag.innerText === 'All') {
        showAllStrategies();
      } else {
        filterStrategyBySelectedTag(clickedTag.innerText);
      }
    }
  });
};

const removeSelectedTags = () => {
  let tags = document.querySelectorAll('.strategies__tags .tag');
  tags.forEach((tag) => {
    tag.classList.remove('tag_selected');
    tag.classList.add('tag_bordered');
  });
};

const selectClickedTag = (clickedTag) => {
  clickedTag.classList.add('tag_selected');
  clickedTag.classList.remove('tag_bordered');
};

const showAllStrategies = () => {
  let strategies = document.querySelectorAll('.strategy-wrapper .strategy');
  strategies.forEach((strategy) => {
    strategy.classList.remove('strategy_hidden');
  });
};

const filterStrategyBySelectedTag = (selectedTag) => {
  let strategies = document.querySelectorAll('.strategy-wrapper .strategy');
  strategies.forEach((strategy) => {
    strategy.classList.add('strategy_hidden');
    strategy.querySelectorAll('.tag').forEach((tag) => {
      if (tag.innerText === selectedTag) {
        strategy.classList.remove('strategy_hidden');
      }
    });
  });
};

const renderArticlesToDom = () => {
  let strategiesWrapper = getStrategiesWrapper();
  generateArticles(data).forEach((article) => {
    strategiesWrapper.append(article.generateArticle());
  });

  addStrategyClickHandler();
};

const getStrategiesWrapper = () => {
  const strategiesContainer = document.querySelector('.strategy-wrapper');
  strategiesContainer.innerHTML = '';
  return strategiesContainer;
};

const generateArticles = (data) => {
  let articles = [];
  data.forEach((article) => {
    articles.push(new Article(article));
  });
  return articles;
};

const addToolsClickHandler = () => {
  document
    .querySelector('.tools__button .button')
    .addEventListener('click', () => {
      generateToolsModal();
    });
};

const generateToolsModal = () => {
  renderModalWindow('Test content for Tools Modal');
};

const renderModalWindow = (content) => {
  let modal = new Modal('tools-modal');
  modal.buildModal(content);
};

const addStrategyClickHandler = () => {
  document.querySelector('.strategy-wrapper').addEventListener('click', (e) => {
    if (e.target.closest('.strategy')) {
      let clickedStrategyId = e.target
        .closest('.strategy')
        .getAttribute('data-id');
      let clickedStrategyData = getClickedData(clickedStrategyId);

      renderArticleModalWindow(clickedStrategyData);
    }
  });
};

const getClickedData = (id) => {
  return data.find((article) => article.id == id);
};

const renderArticleModalWindow = (article) => {
  let modal = new ArticleModal('article-modal', article);
  modal.renderModal();
};
