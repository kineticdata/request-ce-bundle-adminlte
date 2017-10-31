import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Box } from '../../lib/react-adm-lte/src';
import { PageHeader } from '../Common/PageHeader';
import { getColor, getAttributeValue } from '../../helpers/utils';

const { Body } = Box;

const countMatchingForms = (category, forms) =>
  forms
    .filter(form => form.categories.indexOf(category.slug) > -1)
    .count();

export const CategoryListCard = ({ category, forms }) =>
  <Box>
    <Body>
      <Link to={`/categories/${category.slug}`}>
        <div className="category-card">
          <div className="card-content" style={{ borderTopColor: getAttributeValue('Color', category) || getColor(category.slug) }}>
            <div className="card-icon-bg" style={{ backgroundColor: getAttributeValue('Color', category) || getColor(category.slug) }}>
              <i className={`fa-2x fa ${category.icon}`} />
            </div>
            <div className="card-title">
              <h3 className="ellipsis">{category.name}</h3>
              <p className="subtle">{countMatchingForms(category, forms)} Services</p>
            </div>
          </div>
        </div>
      </Link>
    </Body>
  </Box>;

const CategoryListComponent = ({ categories, forms }) =>
  <div>
    <PageHeader
      breadcrumbs={[{ title: 'Categories', path: '/categories' }]}
      title="Categories"
    />
    <div className="content">
      <div className="row">
        {
          categories
            .filter(category => category.slug !== 'home-page-services')
            .map(category =>
              <CategoryListCard
                key={category.slug}
                category={category}
                forms={forms}
              />)
        }
      </div>
    </div>
  </div>;

const mapStateToProps = state => ({
  categories: state.categories.data,
  forms: state.forms.data,
});

export const CategoryList = connect(mapStateToProps)(CategoryListComponent);
