<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ReportsExport implements WithMultipleSheets
{
    use Exportable;

    protected $period;

    public function __construct($period)
    {
        $this->period = $period;

    }

    public function sheets(): array
    {
        
        $sheets = [
            new VisitExport($this->period),
            new UserTypeExport($this->period),
            new DurationExport($this->period),
            new PageVisitExport($this->period),
            new BounceRateExport($this->period),
        ];

        return $sheets;
    }
}
