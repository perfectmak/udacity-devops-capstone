import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useQuery } from '@apollo/react-hooks';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import DayjsUtil from '@date-io/dayjs';
import { formatCurrency } from '../util/currency-utils';
import { PriceAxis } from '../components/Graphs/PriceAxis';
import { DashboardQuery } from '../api/queries';
import { formatDateString, todaysDateISOOffset, formatDateToISOOffset } from '../util/date-utils';
import { Loadable } from '../components/Loadable';

const incomeColor = '#688cff';
const expenseColor = '#ffe600';
const profitColor = '#61cdbb';
const lossColor = '#f47560';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    marginBottom: theme.spacing(2),
  },
  title: {
    display: 'inline-block',
    marginBottom: theme.spacing(2),
    fontSize: '2.5rem',
    fontWeight: 150,
  },
  summaryPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  summaryPrice: {
    marginTop: theme.spacing(2),
    fontSize: '2.5rem',
    fontWeight: 100,
  },
  barChart: {
    height: '400px',
  }
}));

const monthsBreakdownIdMap = {
  totalIncome: 'Income',
  totalExpense: 'Expense',
};

const incomeExpenseColorMap = {
  totalIncome: incomeColor,
  totalExpense: expenseColor,
};

const mapSummaryMonth = (summary) => ({
  ...summary,
  month: formatDateString(summary.date, 'MMM, YY'),
});

export const DashboardPage = () => {
  const classes = useStyles();
  const [todaysDate] = useState(todaysDateISOOffset());
  const [breakdownDate, setBreakdownDate] = useState(todaysDateISOOffset());
  const { loading, error, data } = useQuery(DashboardQuery, {
    variables: {
      currentDate: todaysDate,
      breakdownDate,
    },
  });

  const yearSummary = data && data.yearSummary.map(mapSummaryMonth);
  const breakdownMonthStr = formatDateString(breakdownDate, 'MMMM');
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container>
        <Typography variant="h5" component="h1" className={classes.title}>
          Dashboard <MuiPickersUtilsProvider utils={DayjsUtil}>
              <DatePicker
                inputVariant="outlined"
                format="MMM, YYYY"
                id="dateField"
                label="Selected Month"
                fullWidth
                openTo="month"
                views={["year", "month"]}
                autoOk
                value={breakdownDate}
                onChange={(selectedDate) => setBreakdownDate(formatDateToISOOffset(selectedDate))}
              />
            </MuiPickersUtilsProvider>
        </Typography>
          
        {/* Month Summary Section */}
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12} md={4}>
            <Paper className={classes.summaryPaper}>
              <Typography variant="h6" component="h3">
                {breakdownMonthStr} Income
              </Typography>
              <Loadable loading={loading} error={error} >
                <Typography className={classes.summaryPrice}>
                  {data && formatCurrency(data.monthSummary.totalIncome, { includeCurrency: true })}
                </Typography>
              </Loadable>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.summaryPaper}>
              <Typography variant="h6" component="h3">
                {breakdownMonthStr} Expense
              </Typography>
              <Loadable loading={loading} error={error} >
                <Typography className={classes.summaryPrice}>
                  {data && formatCurrency(data.monthSummary.totalExpense, { includeCurrency: true })}
                </Typography>
              </Loadable>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.summaryPaper}>
              <Typography variant="h6" component="h3">
                {breakdownMonthStr} Profit
              </Typography>
              <Loadable loading={loading} error={error} >
                <Typography className={classes.summaryPrice}>
                  {data && formatCurrency(data.monthSummary.totalProfit, { includeCurrency: true })}
                </Typography>
              </Loadable>
            </Paper>
          </Grid>
        </Grid>

        {/* Month Breakdown by Category */}
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.summaryPaper}>
              <Typography variant="h6" component="h3">
                {breakdownMonthStr} Income Breakdown
              </Typography>
              <Loadable loading={loading} error={error} >
                <div className={classes.barChart}>
                  <ResponsiveBar
                    keys={['amount']}
                    indexBy="title"
                    enableLabel={false}
                    data={data ? data.monthIncomeBreakdown : []}
                    tooltip={({ value, data }) => (
                      <strong>
                        {data['title']}: {formatCurrency(value, { isBaseUnit: true, includeCurrency: true })}
                      </strong>
                    )}
                    colors={incomeColor}
                    margin={{ top: 10, right: 5, bottom: 80, left: 60 }}
                    animate={true}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 60,
                    }}
                    axisLeft={{
                        renderTick: PriceAxis,
                    }}
                  />
                </div>
              </Loadable>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.summaryPaper}>
              <Typography variant="h6" component="h3">
                {breakdownMonthStr} Expense Breakdown
              </Typography>
              <Loadable loading={loading} error={error} >
                <div className={classes.barChart}>
                  <ResponsiveBar
                    keys={['amount']}
                    indexBy="title"
                    enableLabel={false}
                    data={data ? data.monthExpenseBreakdown : []}
                    tooltip={({ value, data }) => (
                      <strong>
                        {data['title']}: {formatCurrency(value, { isBaseUnit: true, includeCurrency: true })}
                      </strong>
                    )}
                    colors={expenseColor}
                    margin={{ top: 10, right: 5, bottom: 80, left: 60 }}
                    animate={true}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 60,
                    }}
                    axisLeft={{
                        renderTick: PriceAxis,
                    }}
                  />
                </div>
              </Loadable>
            </Paper>
          </Grid>
        </Grid>
    
        {/* TimeSeries Breakdown Section */}
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12}>
            <Paper className={classes.summaryPaper}>
              <Typography variant="h6" component="h3">
              12 Months Income & Expense
              </Typography>
              <div className={classes.barChart}>
                <ResponsiveBar
                  enableLabel={false}
                  groupMode="grouped"
                  keys={['totalIncome', 'totalExpense']}
                  indexBy="month"
                  data={yearSummary || []}
                  colors={({ id }) => (incomeExpenseColorMap[id])}
                  tooltip={({ id, value }) => (
                    <strong>
                      {monthsBreakdownIdMap[id]}: {formatCurrency(value, { includeCurrency: true })}
                    </strong>
                  )}
                  margin={{ top: 10, right: 5, bottom: 80, left: 60 }}
                  padding={0.3}
                  animate={true}
                  axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 60,
                  }}
                  axisLeft={{
                    renderTick: PriceAxis,
                  }}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12}>
            <Paper className={classes.summaryPaper}>
              <Typography variant="h6" component="h3">
              12 Months Profit/Loss
              </Typography>
              <div className={classes.barChart}>
                <ResponsiveBar
                  enableLabel={false}
                  enableGridX={true}
                  enableGridY={false}
                  keys={["totalProfit"]}
                  indexBy="month"
                  data={yearSummary || []}
                  colors={({ value }) => ((value >= 0) ? profitColor : lossColor)}
                  tooltip={({ value }) => {
                    const legend = value >= 0 ? 'Profit' : 'Loss';
                    return (
                      <strong>
                        {legend}: {formatCurrency(value, { includeCurrency: true })}
                      </strong>
                    )
                  }}
                  margin={{ top: 10, right: 2, bottom: 80, left: 60 }}
                  padding={0.3}
                  animate={true}
                  axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 60,
                  }}
                  axisLeft={{
                    renderTick: PriceAxis,
                  }}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>     
    </div>
  );
}

export default DashboardPage;