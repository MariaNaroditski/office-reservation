# office-reservation

# file-to-upload can be download from client/public.

# You're given a CSV file containing office reservation data. Each line represents a reservation of a unique office.

# There are four columns in each line: Capacity, Monthly Price, Start Day, and End Day. The fourth column "End Day" could be empty, meaning the office is indefinitely reserved starting from the Start Day.

# In this project I write React application that allows users to upload a CSV file, simulate a request to the backend and get analyzed results.

# The user can choose / input a month and a year (YYYY-MM) and the app will read the uploaded CSV file and answer the following questions:

# 1. What is the revenue for the month? Revenue is calculated according to the monthly price of the reserved offices. If an office is partially reserved for a given month, the revenue should be prorated based on the monthly price. For example, 2, 1500, 2014-04-01, 2014-04-15 counts as $750 in revenue for April because the reservation was for half of the month.

# 2. What is the total capacity of the unreserved offices for the month? An office is considered reserved if it was reserved even for a single day for a given month.
