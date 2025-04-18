import random
from datetime import datetime, timedelta
from app.database import SessionLocal
from app.models.server import Server
from app.models.metrics import ServerMetrics

def generate_mock_data():
    db = SessionLocal()
    
    # Create servers
    servers = [
        Server(name="Web Server", ip_address="192.168.1.1", tag="Production", provider="AWS"),
        Server(name="DB Server", ip_address="192.168.1.2", tag="Database", provider="Azure"),
    ]
    
    for server in servers:
        db.add(server)
    db.commit()
    
    # Create metrics
    for server in db.query(Server).all():
        for i in range(30):  # 30 data points
            db.add(ServerMetrics(
                server_id=server.id,
                timestamp=datetime.now() - timedelta(hours=i),
                cpu_usage=random.uniform(0, 100),
                memory_usage=random.uniform(0, 100),
                disk_usage=random.uniform(0, 100),
                network_in=random.uniform(0, 1000),
                network_out=random.uniform(0, 1000),
                alerts=random.randint(0, 10),
                alert_level=random.choice(["critical", "medium", "low", None])
            ))
    db.commit()

if __name__ == "__main__":
    generate_mock_data()