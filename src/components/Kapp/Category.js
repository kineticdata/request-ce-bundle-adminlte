import React from 'react';
import { connect } from 'react-redux';

import { PageHeader } from '../Common/PageHeader';
import { FormCardLarge } from '../Forms/FormCard';

const CategoryComponent = ({ category, forms }) =>
  <div>
    <PageHeader
      title={category.name}
      subTitle="Category"
      breadcrumbs={[{ title: 'Categories', path: '/categories' }, { title: category.name }]}
    />
    <div className="content">
      <div className="col-xs-12">
        <section>
          <div className="row">
            <div className="col-sm-12">
              {
                forms.map(thisForm => <FormCardLarge key={thisForm.slug} form={thisForm} />)
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>;

const mapStateToProps = (state, props) => ({
  category:
    state.categories.data
      .filter(category => category.slug === props.match.params.categorySlug)
      .first(),
  forms:
    state.forms.data
      .filter(form => form.categories.indexOf(props.match.params.categorySlug) > -1),
});

export const Category = connect(mapStateToProps)(CategoryComponent);
