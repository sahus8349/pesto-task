<?php

namespace App\Enums;

enum IncidentTypeEnum: string
{
    case ENTERPRISE = "Enterprise";
    case GOVERNMENT = "Government";

    public static function getOptions(): array
    {
        $options = [];
        foreach (self::cases() as $value) {
           $options[$value->name] = ["label"=>$value->value,"value"=>$value->name];
        }

        return $options;
    }

    public static function getNameWiesOptions(): array
    {
        $options = [];
        foreach (self::cases() as $value) {
           $options[strtolower($value->value)] = ["label"=>$value->value,"value"=>$value->name];
        }

        return $options;
    }

    public static function filter(): array
    {
        $options = [];
        foreach (self::cases() as $value) {
           $options[] = ["id"=>$value->name,"value"=>$value->value];
        }

        return $options;
    }

    public static function mapValues($value): array
    {
        $options = self::getOptions();
        return $options[$value];
    }
}
