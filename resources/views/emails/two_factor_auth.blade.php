<x-mail::message>
# OTP Authentication Code

Hi {{ $user['name']}},

Here is your login OTP verification code.

<x-mail::panel>
# Code: {{$code}}
</x-mail::panel>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
