<x-mail::message>
# Feedback Reply

Hi {{$name}},

<x-mail::panel>
{{$message}}
</x-mail::panel>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
