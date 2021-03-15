select
    date,
    count
from
    (
        select
            created_at :: date as date,
            count(*)
        from
            posts
        group by
            date
        order by
            date
    ) x