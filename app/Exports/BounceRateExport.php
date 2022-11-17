<?php

namespace App\Exports;

use Analytics;
use Spatie\Analytics\Period;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class BounceRateExport implements FromArray, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithCustomStartCell, WithTitle
{
    private $period;

    public function __construct($period)
    {
        $this->period = $period;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function array(): array
    {
        $analyticsData = Analytics::performQuery(Period::days($this->period), 'ga:sessions',[
            'metrics' => 'ga:sessions,ga:bounces',
            'dimensions' => 'ga:date'
        ]);

        return $analyticsData['rows'];
    }

    public function map($rate): array
    {
         return [
            date("d F, Y", $rate[0]),
            $rate[1],
        ];
    }

    public function headings(): array
    {
        return [
        
            'Date',
            'Value',
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->getStyle('B3:C3')->applyFromArray([
                    'font' => [
                        'bold' => true,
                    ],
                ]);
            },
        ];
    }

    public function startCell(): string
    {
        return 'B3';
    }

    public function title(): string
    {
        return 'Bounce Rate';
    }
}
