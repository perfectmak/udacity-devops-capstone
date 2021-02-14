import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import DayjsUtil from '@date-io/dayjs';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import { OutlinedSelect } from '../OutlinedSelect';
import { todaysDate, formatDateString } from '../../util/date-utils';
import { EXPENSE_TX_TYPE, INCOME_TX_TYPE, formatQuantityUnit } from '../../util/transactions-utils';

const quantityUnits = [
  'Unit',
  'Yard',
  'Pack',
  'Set',
  'Roll',
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  row: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(1),
  },
  formControl: {
    width: '100%',
  },
  selectField: {
    padding: theme.spacing(1),
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const CreateTransactionSchema = Yup.object().shape({
  title: Yup.string()
    .max(255, 'Title should not be more than 255 characters.')
    .required('Title is required. Short description.'),
  amount: Yup.number()
    .positive('Negative price not allowed')
    .required('Amount is required'),
  type: Yup.string()
    .nullable()
    .required('Required'),
  categoryId: Yup.string()
    .required('Required'),
  date: Yup.string()
    .nullable()
    .required('Required'),
  quantity: Yup.string()
    .nullable(),
  quantityUnit: Yup.string()
    .nullable(),
  description: Yup.string()
    .nullable(),
});


export const TransactionForm = (props) => {
  const classes = useStyles();
  const {
    transaction = {},
    categories = [],
    onTypeChange,
    onSubmit,
    isSubmitting,
  } = props;

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit(values);
    // this is to prevent freezing of fields
    setSubmitting(false);
  }
  
  return (<Formik
    key={`${transaction.formKey}-new-form`}
    initialValues={{
      title: transaction.title || '',
      amount: (transaction.amount / 100) || '',
      type: transaction.type || '',
      categoryId: transaction.categoryId || '',
      date: transaction.date || todaysDate(),
      quantity: transaction.quantity || '',
      quantityUnit: transaction.quantityUnit || '',
      description: transaction.description || '',
    }}
    validationSchema={CreateTransactionSchema}
    onSubmit={handleSubmit}>{(props) => {
      const {
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
      } = props;
      return (<Form>
        <Grid container spacing={2} className={classes.row}>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DayjsUtil}>
              <DatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="DD MMM, YYYY"
                id="dateField"
                label="Date *"
                fullWidth
                value={values.date}
                autoOk
                disableFuture
                onChange={(selectedDate) => handleChange({
                  target:
                  { name: 'date', value: selectedDate && formatDateString(selectedDate.toISOString()), },
                })}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <OutlinedSelect 
              id="typeField"
              name="type"
              label="Type *"
              onChange={(e) => {
                onTypeChange(e.target.value);
                // reset categoryId. not sure if this is the best place to do this
                setFieldValue('categoryId', '');
                handleChange(e);
              }}
              formControlClassName={classes.formControl}
              menuItems={[
                { id: EXPENSE_TX_TYPE, title: 'Expense' },
                { id: INCOME_TX_TYPE, title: 'Income' }
              ]}
              selectedItemId={values.type}
              errors={errors}
              touched={touched}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.row}>
          <Grid item xs={12}>
            <Field
              id="titleField"
              label="Title *"
              name="title"
              component={TextField}
              className={classes.formControl}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.row}>
          <Grid item xs={6}>
            <Field
              id="amountField"
              label="Amount (₦) *"
              name="amount"
              component={TextField}
              className={classes.formControl}
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <OutlinedSelect 
              id="categoryField"
              name="categoryId"
              label="Category *"
              onChange={handleChange}
              formControlClassName={classes.formControl}
              menuItems={categories}
              selectedItemId={values.categoryId}
              errors={errors}
              touched={touched}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.row}>
          <Grid item xs={12}>
            <Field
              id="descriptionField"
              label="Description (optional)"
              name="description"
              component={TextField}
              multiline={true}
              rows={3}
              className={classes.formControl}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.row}>
          <Grid item xs={6}>
            <Field
              id="quantityField"
              label="Quantity (optional)"
              name="quantity"
              component={TextField}
              className={classes.formControl}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <OutlinedSelect 
              id="quantityUnitField"
              name="quantityUnit"
              label="Unit (optional)"
              onChange={handleChange}
              formControlClassName={classes.formControl}
              menuItems={[
                { id: '', title: '' },
                ...quantityUnits.map(unit => ({ id: unit, title: formatQuantityUnit(unit) })),
              ]}
              selectedItemId={values.quantityUnit}
              errors={errors}
              touched={touched}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.row}>
          <Grid item xs={12}>
            <div className={classes.buttonWrapper}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
              {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </Grid>
        </Grid>
      </Form>);
    }}</Formik>);
}