select
    (data ->> 'first_name') :: text as first_name,
    (data ->> 'last_name') :: text as last_name,
    DATE_PART('year', current_date) - DATE_PART(
        'year',
        (data ->> 'date_of_birth') :: text :: date
    ) as date_of_birth,
    json_array_elements_text(data -> 'email_addresses') as email_addresses,
    (data ->> 'private') :: text as private
from
    users
order by
    first_name,
    last_name;