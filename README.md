# Data Mesh

## Abstract

This study focuses on the 'Data Mesh' technology, aiming to address the challenges traditional Hospital Information Systems (HIS) face in Taiwan. Faced with the lack of effective integration and sharing mechanisms among multiple database systems, this research tackles both structured and unstructured data and the complexity of heterogeneous databases. Considering the ever-increasing data volume, we focus on realizing data decentralization and distributed storage.

During the implementation phase, to achieve database decentralization, distributed storage, and to implement Change Data Capture (CDC), we chose three heterogeneous databases for practical application, including MongoDB, MySQL, and Azure SQL. Through Kafka scheduling, we successfully accomplished data synchronization and real-time updates. Kafka, serving as a distributed streaming platform, provides a feasible solution for efficient data transmission and processing.

We utilized the Confluent Local Platform to establish Kafka connectors to ensure real-time synchronization. By setting detailed connection configurations and transmission methods, we can ensure that when one database is updated, the other two can synchronize in real time, thereby maintaining the consistency of the overall system.

Finally, we designed a one-page case management website using the MERN stack architecture, applying the Data Mesh technology in practice. The website supports basic CRUD operations, with one page simultaneously displaying data from the three databases, showcasing the consistency of data synchronization.

This study has practical significance in solving data management challenges in the medical field and provides a valuable reference for future research and practices in similar domains.

