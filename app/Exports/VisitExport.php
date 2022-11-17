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

class VisitExport implements FromArray, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithCustomStartCell, WithTitle
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
        $analyticsData = Analytics::fetchVisitorsAndPageViews(Period::days($this->period));

        return json_decode(json_encode($analyticsData), true);
    }

    public function map($visit): array
    {
         return [
            $visit['date'],
            $visit['pageTitle'],
            $visit['pageViews'],
            $visit['visitors']
        ];
    }

    public function headings(): array
    {
        return [  
            'Date',
            'Page Title',
            'Page Views',
            'Visitors'
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->getStyle('B3:E3')->applyFromArray([
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
        return 'Page Visit And Views';
    }
}
