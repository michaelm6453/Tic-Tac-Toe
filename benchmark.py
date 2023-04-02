import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots


df = pd.read_json("data.json", orient='split');

fig = make_subplots(rows=1, cols=1, x_title="Empty Spaces on the board", y_title="Milliseconds (ms)", figure =
    go.Figure(layout = {
        "title": "The time taken for a minimax search against the number of empty spaces to search through",
        "font": dict(
            family="Roboto Mono",
            size=14,
            color="Black"
        )
    })
);


fig.add_trace(go.Scatter(name = "Empty Space", y = df["Empty_Space"], x = df["columns"], fill='none', mode='lines+markers'), row=1, col=1);


fig.write_html('graph.html', auto_open=True)
