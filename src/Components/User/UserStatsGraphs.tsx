import React from "react";
import styles from './UserStatsGraphs.module.css'
import { VictoryBar, VictoryChart, VictoryPie } from 'victory';

interface PhotoWithAccess {
  id: number;
  title: string;
  acessos: string;
}

interface GraphData {
  x: string;
  y: number;
}

interface UserStatsGraphsProps {
  user: PhotoWithAccess[];
}

const UserStatsGraphs: React.FC<UserStatsGraphsProps> = ({ user }) => {
  const [total, setTotal] = React.useState<number>(0);
  const [graph, setGraph] = React.useState<GraphData[]>([]);

  React.useEffect(() => {
    if (!user || !Array.isArray(user) || user.length === 0) {
      setTotal(0);
      setGraph([]);
      return;
    }

    const graphData: GraphData[] = user.map(item => ({
      x: item.title.length > 15 ? `${item.title.substring(0, 15)}...` : item.title,
      y: Number(item.acessos) || 0
    }));

    const totalAcessos = user
      .map(({ acessos }) => Number(acessos) || 0)
      .reduce((a, b) => a + b, 0);

    setTotal(totalAcessos);
    setGraph(graphData);
  }, [user]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
        <p>Total de Fotos: {user?.length || 0}</p>
      </div>
      
      {graph.length > 0 && (
        <div className={styles.graphItem}>
          <VictoryPie
            data={graph}
            colorScale={["#fb1", "#764501", "#f1d6ab", "#fea", "#a67c52", "#c9a87a"]}
            innerRadius={70}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            style={{
              data: {
                stroke: "#fff",
                strokeWidth: 2,
                fillOpacity: 0.9
              },
              labels: {
                fontSize: 11,
                fontWeight: "bold",
                fill: "#333",
                padding: 8
              }
            }}
            animate={{
              duration: 1000,
              easing: "bounce"
            }}
          />
        </div>
      )}

      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graph}>
          </VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphs;