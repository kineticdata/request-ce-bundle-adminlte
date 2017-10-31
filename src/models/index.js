import { getAttributeValue } from '../helpers';
import * as constants from '../constants';

export const Form = object =>
  ({
    name: object.name,
    slug: object.slug,
    description: object.description,
    icon: getAttributeValue(object, constants.ATTRIBUTE_ICON, constants.DEFAULT_FORM_ICON),
    categories: object.categorizations.map(c => c.category.slug),
  });

export const Category = object =>
  ({
    name: object.name,
    slug: object.slug,
    sortOrder: parseInt(getAttributeValue(object, constants.ATTRIBUTE_ORDER, 1000), 10),
    icon: getAttributeValue(object, constants.ATTRIBUTE_ICON, constants.DEFAULT_CATEGORY_ICON),
    parent: getAttributeValue(object, constants.ATTRIBUTE_PARENT),
  });
