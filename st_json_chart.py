import streamlit as st
import plotly.graph_objects as go
import json
from datetime import datetime, timedelta

# Load the JSON data
with open('chart.json', 'r') as file:
    data = json.load(file)

# Function to parse time string
def parse_time(time_str):
    return datetime.strptime(time_str, '%I %p').time()

# Function to create a datetime object for the current week
def get_date_for_day(day, time):
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    day_index = days.index(day)
    today = datetime.now().date()
    start_of_week = today - timedelta(days=today.weekday())
    return datetime.combine(start_of_week + timedelta(days=day_index), parse_time(time))

# Prepare data for plotting
dates = []
systolic = []
diastolic = []
heart_rates = []

for day_data in data['weekdays']:
    for reading in day_data['readings']:
        if reading['bloodPressure']:
            date = get_date_for_day(day_data['day'], reading['time'])
            dates.append(date)
            sys, dia = map(int, reading['bloodPressure'].split('/'))
            systolic.append(sys)
            diastolic.append(dia)
            heart_rates.append(reading['heartRate'])

# Create the Streamlit app
st.title('Collate - Medical Agents')

# Create the blood pressure chart
fig_bp = go.Figure()

fig_bp.add_trace(go.Scatter(x=dates, y=systolic, mode='lines+markers', name='Systolic',
                            line=dict(color='red', width=2),
                            marker=dict(size=8, symbol='circle')))

fig_bp.add_trace(go.Scatter(x=dates, y=diastolic, mode='lines+markers', name='Diastolic',
                            line=dict(color='blue', width=2),
                            marker=dict(size=8, symbol='circle')))

fig_bp.update_layout(title='Blood Pressure Over Time',
                     xaxis_title='Date and Time',
                     yaxis_title='Blood Pressure (mmHg)',
                     legend_title='Measurement',
                     hovermode='x unified')

st.plotly_chart(fig_bp)

# Create the heart rate chart
fig_hr = go.Figure()

fig_hr.add_trace(go.Scatter(x=dates, y=heart_rates, mode='lines+markers', name='Heart Rate',
                            line=dict(color='green', width=2),
                            marker=dict(size=8, symbol='circle')))

fig_hr.update_layout(title='Heart Rate Over Time',
                     xaxis_title='Date and Time',
                     yaxis_title='Heart Rate (bpm)',
                     hovermode='x unified')

st.plotly_chart(fig_hr)

# Display raw data
if st.checkbox('Show raw data'):
    st.subheader('Raw data')
    st.json(data)